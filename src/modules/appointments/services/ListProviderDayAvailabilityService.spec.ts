import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider availability in a day', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'id-example',
      date: new Date(2020, 11, 24, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id-example',
      date: new Date(2020, 11, 24, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'id-example',
      day: 24,
      month: 12,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
