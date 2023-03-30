import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import usePacks from './usePacks';
import { toggleSelectedPack, deletePack } from '../../redux/packsSlice';

jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../redux/packsSlice');

describe('usePacks()', () => {
  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: jest.fn,
    });
  });

  describe('packsSlice', () => {
    it('should return the packsSlice', () => {
      const fakePackSlice = { packs: [], selectedPack: '123' };
      useSelector.mockReturnValueOnce(fakePackSlice);

      const result = usePacks();

      expect(result.packsSlice).toEqual(fakePackSlice);
    });
  });

  describe('packs', () => {
    it('should return an empty array if packs is empty', () => {
      const fakePackSlice = {
        packs: [],
        selectedPack: null,
      };
      useSelector.mockReturnValueOnce(fakePackSlice);

      const result = usePacks();

      expect(result.packs).toEqual([]);
    });

    it('should return an array of pack objects with methods', () => {
      const fakePackSlice = {
        packs: [
          {
            brand: 'packBrand1',
            model: 'packModel1',
            weight: 1,
            capacity: 1,
          },
          {
            brand: 'packBrand2',
            model: 'packModel2',
            weight: 2,
            capacity: 2,
          },
        ],
        selectedPack: null,
      };
      useSelector.mockReturnValueOnce(fakePackSlice);

      const { packs } = usePacks();

      packs.forEach((pack, i) => {
        expect(pack).toMatchObject(fakePackSlice.packs[i]);
        expect(pack).toHaveProperty('isSelected');
        expect(pack).toHaveProperty('select');
        expect(pack).toHaveProperty('openEdit');
      });
    });

    describe('pack.select()', () => {
      it('should call dispatch with toggleSelectedPack', () => {
        const mockDispatch = jest.fn();
        const fakePackSlice = {
          packs: [
            {
              brand: 'packBrand1',
              model: 'packModel1',
              weight: 1,
              capacity: 1,
            },
            {
              brand: 'packBrand2',
              model: 'packModel2',
              weight: 2,
              capacity: 2,
            },
          ],
          selectedPack: null,
        };
        useSelector.mockReturnValueOnce(fakePackSlice);
        useDispatch.mockReturnValueOnce(mockDispatch);

        const { packs } = usePacks();

        packs[0].select();

        expect(mockDispatch).toHaveBeenCalled();
      });
    });
  });

  describe('selectedPack', () => {
    it('should return undefined if no selected pack', () => {
      const fakePackSlice = {
        packs: [{ id: '123' }, { id: '456' }],
        selectedPack: '789',
      };
      useSelector.mockReturnValueOnce(fakePackSlice);
      const { selectedPack } = usePacks();

      expect(selectedPack).toBeUndefined();
    });

    it('should return selected pack if selected back is available', () => {
      const fakePackSlice = {
        packs: [
          { id: '123', brand: 'brand1' },
          { id: '456', brand: 'brand2' },
        ],
        selectedPack: '123',
      };
      useSelector.mockReturnValueOnce(fakePackSlice);
      const { selectedPack } = usePacks();

      expect(selectedPack).toMatchObject(fakePackSlice.packs[0]);
    });
  });

  describe('getPackById()', () => {
    it('should return pack with matching id', () => {
      const fakePackSlice = {
        packs: [
          { id: '123', brand: 'brand1' },
          { id: '456', brand: 'brand2' },
        ],
        selectedPack: '123',
      };
      useSelector.mockReturnValueOnce(fakePackSlice);
      const { getPackById } = usePacks();

      const result = getPackById('123');
      expect(result).toMatchObject(fakePackSlice.packs[0]);
    });

    it('should return undefined if no pack matches id', () => {
      const fakePackSlice = {
        packs: [
          { id: '123', brand: 'brand1' },
          { id: '456', brand: 'brand2' },
        ],
        selectedPack: '123',
      };
      useSelector.mockReturnValueOnce(fakePackSlice);
      const { getPackById } = usePacks();

      const result = getPackById('789');
      expect(result).toBeUndefined();
    });
  });
});
