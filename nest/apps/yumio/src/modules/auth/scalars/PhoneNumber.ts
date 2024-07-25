import { CustomScalar, Scalar } from '@nestjs/graphql';

// import { validationError } from '../../../common/ErrorHandling';

@Scalar('PhoneNumber', (type) => PhonumberNumberScalar)
export class PhonumberNumberScalar implements CustomScalar<string, string> {
  // constructor(private phoneVerificationService: PasswordlessAuthService) {}

  name: 'PhoneNumber';
  description: 'Scalar for phonenumber with libphone-js validation on input';

  // Serializes an internal value to include in a response.
  serialize(value: unknown): string {
    return `${value}`; // value sent to the client
  }

  // WAS BASES ON TWILIO API CALL
  // Parses an externally provided value to use as an input.
  parseValue(value: unknown): string {
    return String(value);
    // const phone = this.phoneVerificationService.getInfo(value);
    // if (!phone) {
    //   validationError(`Invalid phonenumber: ${value}`);
    // }
    // return `${this.phoneVerificationService.returnValidPhoneNumber(phone)}`; // value from the client input variables
  }

  // Parses an externally provided literal value to use as an input.
  parseLiteral(value): string {
    return `${value}`; // value from the client query
  }
}
// export class PhoneNumber;

export type PhoneNumber = string;
