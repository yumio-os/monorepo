import { Module } from '@nestjs/common';

import { UploadScalar } from './scalars';

@Module({
  providers: [UploadScalar],
  exports: [UploadScalar],
})
export class CommonModule {}
