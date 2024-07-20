import { GenericOpts } from '@yumio/common';
import { ApiKey } from '@yumio/modules/apiKey/model';

export interface Opts extends GenericOpts {
  context?: { id?: string; apiKeyDetails?: ApiKey };
}
