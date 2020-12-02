import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllAvailabilityInMonthByProviderDTO from '../dtos/IFindAllAvailabilityInMonthByProviderDTO';
import IFindAllAvailabilityInDayByProviderDTO from '../dtos/IFindAllAvailabilityInDayByProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllAvailabilityInMonthByProvider(
    data: IFindAllAvailabilityInMonthByProviderDTO,
  ): Promise<Appointment[]>;
  findAllAvailabilityInDayByProvider(
    data: IFindAllAvailabilityInDayByProviderDTO,
  ): Promise<Appointment[]>;
}
