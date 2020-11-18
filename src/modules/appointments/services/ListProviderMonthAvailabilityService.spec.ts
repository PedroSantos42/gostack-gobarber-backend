import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider availability in a month', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'id-example',
      date: new Date(2020, 11, 24, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id-example',
      date: new Date(2020, 11, 24, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id-example',
      date: new Date(2020, 11, 25, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'id-example',
      year: 2020,
      month: 12,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 22, available: true },
        { day: 23, available: true },
        { day: 24, available: false },
        { day: 25, available: false },
        { day: 26, available: true },
      ]),
    );
  });
});
