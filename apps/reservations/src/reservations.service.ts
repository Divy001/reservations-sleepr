import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timeStamp: new Date(),
      userId,
    });
  }

  findAll() {
    return this.reservationRepository.find({});
    return `This action returns all reservations`;
  }

  findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      {
        _id,
      },
      {
        ...updateReservationDto,
      },
    );
  }

  remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
