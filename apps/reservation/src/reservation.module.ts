import { Module } from '@nestjs/common'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { DatabaseModule } from '@app/common'

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
