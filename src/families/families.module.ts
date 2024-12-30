import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Family]), AuthModule],
  controllers: [FamiliesController],
  providers: [FamiliesService],
  exports: [TypeOrmModule],
})
export class FamiliesModule {}
