import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Get provider ID from session/token
    // For now, we'll get it from query params or headers
    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get('providerId');

    if (!providerId) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      );
    }

    // Fetch packages where provider_id matches
    const { data: packages, error } = await supabase
      .from('packages')
      .select(`
        *,
        customer:customers(
          id,
          company_name,
          work_email
        )
      `)
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching provider packages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch packages' },
        { status: 500 }
      );
    }

    // Group packages by status
    const packageStats = {
      all: packages.length,
      ongoing: packages.filter(pkg => pkg.status === 'active' || pkg.status === 'in_progress').length,
      completed: packages.filter(pkg => pkg.status === 'completed').length,
      upcoming: packages.filter(pkg => pkg.status === 'upcoming' || pkg.status === 'pending').length
    };

    return NextResponse.json({
      packages,
      stats: packageStats
    });

  } catch (error) {
    console.error('Error in provider packages API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}