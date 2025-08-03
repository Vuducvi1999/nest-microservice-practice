import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@app/common'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return { uri: config.get('DB_URI') }
      },
    }),
  ],
})
export class DatabaseModule {}
