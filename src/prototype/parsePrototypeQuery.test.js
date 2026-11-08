import { parsePrototypeQuery, buildPrototypeSearch } from './parsePrototypeQuery';
import { PROTOTYPE_PARTIAL_FILL_PERCENT } from './fixtureDataset';

describe('parsePrototypeQuery', () => {
  it('defaults to baseline locker with partial fill', () => {
    expect(parsePrototypeQuery('')).toEqual({
      direction: 'baseline',
      view: 'locker',
      waterFill: PROTOTYPE_PARTIAL_FILL_PERCENT,
      chartLiquid: PROTOTYPE_PARTIAL_FILL_PERCENT,
      editItemId: expect.any(String),
      editPackId: expect.any(String),
    });
  });

  it('accepts matrix view and direction for variant reuse', () => {
    const config = parsePrototypeQuery(
      '?direction=restrained&view=water&waterFill=30&chartLiquid=40'
    );
    expect(config.direction).toBe('restrained');
    expect(config.view).toBe('water');
    expect(config.waterFill).toBe(30);
    expect(config.chartLiquid).toBe(40);
  });

  it('falls back on unknown direction/view', () => {
    const config = parsePrototypeQuery('?direction=neon&view=spaceship');
    expect(config.direction).toBe('baseline');
    expect(config.view).toBe('locker');
  });
});

describe('buildPrototypeSearch', () => {
  it('builds a reusable capture URL query', () => {
    expect(buildPrototypeSearch({ direction: 'warm', view: 'mypack' })).toBe(
      '?direction=warm&view=mypack'
    );
  });
});
