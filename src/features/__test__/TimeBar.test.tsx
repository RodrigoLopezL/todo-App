import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TimeBar from '../TimeBar';
import { fetchTimeData } from '../../services/apiService';
import { time } from 'console';

vi.mock('../../services/apiService');
const mockFetchTime = vi.mocked(fetchTimeData);

vi.mock('../../services/apiService', () => ({
    fetchTimeData: vi.fn(),
}));

vi.mock('../../utils/dateUtils', () => ({
    parseFormatTimePT: (time: string) => `Formatted ${time}`,
}));

describe('TimeBar Component', () => {
    it('renders loading state initially', () => {
        (fetchTimeData as vi.Mock).mockResolvedValueOnce(null);

        render(<TimeBar />);

        expect(screen.getByText('loading tasks...')).toBeDefined();
    });

    // it('renders data correctly when API call succeeds', async () => {
    //     mockFetchTime.mockReturnValue({
    //         AvgTotalTime: 100,
    //         avgTimeLowPriority: 50,
    //         avgTimeMediumPriority: 75,
    //         avgTimeHighPriority: 150,
    //     });
        
    //     render(<TimeBar />);

    //     expect(await screen.getByTestId('avgtimetotal')).toBeDefined();
    //     expect(await screen.getByTestId('avgtimelow')).toBeDefined();
    //     expect(await screen.getByTestId('avgtimemedium')).toBeDefined();
    //     expect(await screen.getByTestId('avgtimehigh')).toBeDefined();
    // });

    it('renders null when no data is returned', async () => {
        (fetchTimeData as vi.Mock).mockResolvedValueOnce(null);

        render(<TimeBar />);

        await screen.findByText('loading tasks...'); // Wait for loading state to appear
        expect(screen.queryByText('Average time to finish tasks:')).toBeNull();
    });
});