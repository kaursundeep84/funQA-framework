#!/usr/bin/env bash
set -eo pipefail
ENV=$1
PREFIX="QA_FRAMEWORK"

# Array of available/required environment variables
ENV_VARS=(
  "SUIT_NAME"
  "SEND_RESULTS_TO"
  # Email configuration
  "SENDGRID_API_KEY"
  # AWS S3
  "AWS_S3_ACCESS_KEY_ID"
  "AWS_S3_SECRET_KEY"
  "AWS_S3_REGION"
  "AWS_S3_BUCKET"
  # TC_CONN_APP
  "TC_CONN_APP_URL"
  ## Manager account
  "TC_CONN_APP_MANAGER_USER"
  "TC_CONN_APP_MANAGER_PASS"
  "TC_CONN_APP_MANAGER_NAME"
  "TC_CONN_APP_MANAGER_AVATAR"
  ## Customer (normal user) account
  "TC_CONN_APP_CUSTOMER_USER"
  "TC_CONN_APP_CUSTOMER_PASS"
  "TC_CONN_APP_CUSTOMER_NAME"
  "TC_CONN_APP_CUSTOMER_AVATAR"
  ## Copilot account
  "TC_CONN_APP_COPLIOT_USER"
  "TC_CONN_APP_COPLIOT_PASS"
  "TC_CONN_APP_COPILOT_NAME"
  "TC_CONN_APP_COPILOT_AVATAR"
)

# Iterate through the ENV_VARS array, parse and export all env variables
# based on the environment (ENV).
#
# Environment variables should be prefixed by the environment + QA_FRAMEWORK
# For example:
# DEV_QA_FRAMEWORK_AWS_S3_QA_REGION will be parsed as AWS_S3_QA_REGION
for ENV_VAR in ${ENV_VARS[@]}; do
  FULL_VAR="${ENV}_${PREFIX}_${ENV_VAR}"
  VAR_VALUE=$(eval echo \$${FULL_VAR})
  export ${ENV_VAR}=${VAR_VALUE}
done
