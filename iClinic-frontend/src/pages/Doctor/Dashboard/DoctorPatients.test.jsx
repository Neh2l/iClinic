import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DoctorPatients from './DoctorPatients';

// Mock DoctorLayout
jest.mock('../DoctorLayout', () => {
  return ({ children }) => <div data-testid="doctor-layout">{children}</div>;
});

// Mock localStorage
const mockToken = 'test-token-123';
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => mockToken);
});

// Mock fetch
global.fetch = jest.fn();

const mockPatients = [
  {
    _id: 'patient-1',
    name: 'John Doe',
    photo: '/john.jpg',
    createdAt: '2024-01-15T10:00:00Z',
    gender: 'Male',
    patientDisease: 'Flu'
  },
  {
    _id: 'patient-2',
    name: 'Jane Smith',
    photo: '/jane.jpg',
    createdAt: '2024-02-20T14:30:00Z',
    gender: 'Female',
    patientDisease: 'Cold'
  }
];

describe('DoctorPatients API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch patients from the correct API endpoint', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { patients: mockPatients } })
    });

    render(<DoctorPatients />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://iclinc-backend-gs97.onrender.com/api/v1/doctors/myPatients',
        {
          headers: {
            Authorization: `Bearer ${mockToken}`
          }
        }
      );
    });
  });

  it('should include authorization token from localStorage', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { patients: [] } })
    });

    render(<DoctorPatients />);

    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('token');
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            Authorization: 'Bearer test-token-123'
          }
        })
      );
    });
  });

  it('should render patients after successful API call', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { patients: mockPatients } })
    });

    render(<DoctorPatients />);

    // Use getAllByText since elements appear in both desktop and mobile views
    await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Jane Smith').length).toBeGreaterThan(0);
    });
  });

  it('should render patient details correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { patients: mockPatients } })
    });

    render(<DoctorPatients />);

    // Use getAllByText for elements that appear multiple times
    await waitFor(() => {
      expect(screen.getAllByText('patient-1').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Male').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Flu').length).toBeGreaterThan(0);
    });
  });

  it('should handle empty patients array', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { patients: [] } })
    });

    render(<DoctorPatients />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(screen.getByText('Patients List')).toBeInTheDocument();
  });

  it('should handle API error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<DoctorPatients />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error loading patients:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it('should handle missing data in API response', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({}) // No data.patients
    });

    render(<DoctorPatients />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    // Should not crash, patients should be empty array
    expect(screen.getByText('Patients List')).toBeInTheDocument();
  });

  it('should call API only once on mount', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { patients: mockPatients } })
    });

    render(<DoctorPatients />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should render correct number of patients', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { patients: mockPatients } })
    });

    render(<DoctorPatients />);

    await waitFor(() => {
      // Each patient appears twice (desktop + mobile), so 2 patients = 4 occurrences each
      const johnDoeElements = screen.getAllByText('John Doe');
      const janeSmithElements = screen.getAllByText('Jane Smith');

      // At least 2 occurrences per patient (desktop table + mobile card)
      expect(johnDoeElements.length).toBeGreaterThanOrEqual(2);
      expect(janeSmithElements.length).toBeGreaterThanOrEqual(2);
    });
  });
});
