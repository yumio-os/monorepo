import Stripe from 'stripe';

import { StripeReader, StripeReaderBase } from '@yumio/modules/apiKey/model';

export class StripeMapper {
  static mapToReaderBase(stripeReader: Stripe.Terminal.Reader) {
    if (!stripeReader) {
      return null;
    }

    const target = new StripeReaderBase();
    target.deviceSwVersion = stripeReader.device_sw_version;
    target.deviceType = stripeReader.device_type;
    target.id = stripeReader.id;

    target.label = stripeReader.label;
    target.location = <string>stripeReader.location;
    target.object = stripeReader.object;
    target.serialNumber = stripeReader.serial_number;
    return target;
  }

  static mapToReaderFull(stripeReader: Stripe.Terminal.Reader) {
    if (!stripeReader) {
      return null;
    }

    const target = new StripeReader();
    target.deviceSwVersion = stripeReader.device_sw_version;
    target.deviceType = stripeReader.device_type;
    target.id = stripeReader.id;
    target.label = stripeReader.label;
    target.location = <string>stripeReader.location;
    target.object = stripeReader.object;
    target.serialNumber = stripeReader.serial_number;

    target.action = stripeReader.action;
    target.livemode = stripeReader.livemode;
    target.metadata = stripeReader.metadata;
    target.status = stripeReader.status;
    target.ipAddress = stripeReader.ip_address;
    return target;
  }
}
