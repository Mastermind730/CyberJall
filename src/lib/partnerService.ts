interface ServicePartner {
    id: string;
    company_name: string;
    logo: string;
    website: string;
    specialties?: string[]; // Optional if not in your API
    rating?: number;       // Optional if not in your API
    projectsCompleted?: number; // Optional if not in your API
    description?: string;  // Optional if not in your API
  }
  
export async function fetchPartners(): Promise<ServicePartner[]> {
    try {
      const response = await fetch('/api/companies'); // Your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }
      const data = await response.json();
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