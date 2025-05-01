import axios from "axios";

interface ServicePartner {
    id: string;
    company_name: string;
    logo: string;
    website: string;
  }

export async function fetchPartners(): Promise<ServicePartner[]> {
    try {
      const response = await axios.get('/api/company'); // Your API endpoint
      if (!response) {
        throw new Error('Failed to fetch partners');
      }
      const data = await response.data;
      return data.map((company: any) => ({
        ...company,
        // Add any additional fields or transformations here
        specialties: [], // Add if you have this data
        rating: 4.5,    // Default or fetch from API if available
        projectsCompleted: 100, // Default or fetch from API
        description: "Cybersecurity service provider" // Default
      }));
    } catch (error) {
      console.error("Error fetching partners:", error);
      return []; // Return empty array on error
    }
  }