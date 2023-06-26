export const setRampArrivalConfig = (scenario_key) => ({
  scenarios: {
    [scenario_key]: rampArrivalRateConfigs['scenarios'][scenario_key],
  },
});

export const rampArrivalRateConfigs = {
  scenarios: {
    //The scenario defines ten stages, each lasting for 5 minutes.
    //Each stage increases the target number of VUs by 50, starting from 50 and reaching 750
    RampArrivalRateConfigType1: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s',
      preAllocatedVUs: 300,
      maxVUs: 8000,
      stages: [
        { target: 50, duration: '5m' },
        { target: 100, duration: '5m' },
        { target: 150, duration: '5m' },
        { target: 200, duration: '5m' },
        { target: 250, duration: '5m' },
        { target: 300, duration: '5m' },
        { target: 400, duration: '5m' },
        { target: 500, duration: '5m' },
        { target: 600, duration: '5m' },
        { target: 750, duration: '5m' },
      ],
    },
    //The scenario defines six stages, each lasting for 2 minutes except for the last stage.
    //Each stage increases the target number of VUs.
    //In the last stage, the target remains at 500 for a longer duration of 10 minutes.
    RampArrivalRateConfigType2: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 1000,
      stages: [
        { target: 100, duration: '2m' },
        { target: 200, duration: '2m' },
        { target: 300, duration: '2m' },
        { target: 400, duration: '2m' },
        { target: 500, duration: '2m' },
        { target: 500, duration: '10m' },
      ],
    },
    //The scenario defines six stages, each lasting for 2 minutes except for the last stage.
    //Each stage increases the target number of VUs
    //In the last stage, the target remains at 1000 for a longer duration of 10 minutes.
    RampArrivalRateConfigType3: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 1000,
      stages: [
        { target: 200, duration: '2m' },
        { target: 400, duration: '2m' },
        { target: 600, duration: '2m' },
        { target: 800, duration: '2m' },
        { target: 1000, duration: '2m' },
        { target: 1000, duration: '10m' },
      ],
    },
    //The scenario defines four stages, each lasting for 2 minutes.
    //Each stage increases the target number of VUs
    RampArrivalRateConfigType4: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 1000,
      stages: [
        { target: 25, duration: '2m' },
        { target: 50, duration: '2m' },
        { target: 75, duration: '2m' },
        { target: 100, duration: '2m' },
      ],
    },
  },
};
