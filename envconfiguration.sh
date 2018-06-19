#!/usr/bin/env bash
set -eo pipefail
ENV=$1
export AWS_S3_QA_REGION=$(eval "echo \$${ENV}_AWS_REGION")
export AWS_S3_QA_ACCESS_KEY_ID=$(eval "echo \$${ENV}_AWS_ACCESS_KEY_ID")
export AWS_S3_QA_SECRET_KEY=$(eval "echo \$${ENV}_AWS_SECRET_ACCESS_KEY")
export AWS_S3_QA_BUCKET=$(eval "echo \$${ENV}_AWS_S3_QA_BUCKET")

