import { FindOneOptions, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from '@yumio/modules/apiKey/model';

import { Opts } from '../../../../common/trx';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  async findOneByApiKeyAndDeviceId(
    opts: Opts,
    apiKey: string,
    deviceId: string,
    entityManager = this.apiKeyRepository.manager,
  ): Promise<ApiKey> {
    const options: FindOneOptions<ApiKey> = {
      where: { apiKey, deviceId, active: true },
      // cache: 15 * 60 * 1000,
    };

    return entityManager.findOne(ApiKey, options);
  }

  async findOneByApiKey(opts: Opts, apiKey: string, entityManager = this.apiKeyRepository.manager): Promise<ApiKey> {
    const options: FindOneOptions<ApiKey> = {
      where: { apiKey, active: true },
      // cache: 15 * 60 * 1000,
    };

    return entityManager.findOne(ApiKey, options);
  }

  async createApiKey(
    apiKey: string | undefined,
    deviceId: string | undefined,
    entityManager = this.apiKeyRepository.manager,
  ): Promise<ApiKey> {
    const newKey = new ApiKey();
    newKey.apiKey = apiKey;

    if (deviceId) {
      newKey.deviceId = deviceId;
    }

    return entityManager.save(ApiKey, newKey);
  }

  async save(opts: Opts, apiKey: ApiKey, entityManager = this.apiKeyRepository.manager): Promise<ApiKey> {
    return entityManager.save(ApiKey, apiKey);
  }
}
