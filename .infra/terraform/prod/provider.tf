provider "aws" {
  alias  = "use2"
  region = "es-west-2"

  # Tagging compliant to NVRWHR Resources
  default_tags {
    tags = {
      it-owner = "YumioDEV yumiodev@gmail.com"
      business-owner = "YumioDEV yumiodev@gmail.com"
      purpose = "Dev env resource for ${upper(var.project)}"
      domain = "yumio"
      system = "${var.project}"
      environment = "dev"
      data-classification = "internal-use"
      creation = "auto"
      team =  "YumioDEV yumiodev@gmail.com"
    }
  }
}

terraform {
  backend "s3" {
    bucket = "nvrwhr-infra"
    key    = "terraform/state/nvrwhr-prod"
    region = "es-west-2"
  }
}
