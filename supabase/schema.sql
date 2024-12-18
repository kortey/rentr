-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables with relationships
CREATE TABLE IF NOT EXISTS locations (
    id BIGSERIAL PRIMARY KEY,
    region TEXT NOT NULL,
    district TEXT NOT NULL,
    area TEXT NOT NULL,
    nearby_landmarks TEXT[] DEFAULT '{}',
    distance_to_town TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS specifications (
    id BIGSERIAL PRIMARY KEY,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    square_footage DECIMAL NOT NULL,
    furnished BOOLEAN NOT NULL,
    year_built INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS utilities (
    id BIGSERIAL PRIMARY KEY,
    water BOOLEAN NOT NULL,
    electricity BOOLEAN NOT NULL,
    internet BOOLEAN NOT NULL,
    maintenance TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    experience TEXT NOT NULL,
    languages TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS lease_terms (
    id BIGSERIAL PRIMARY KEY,
    minimum_stay TEXT NOT NULL,
    security_deposit DECIMAL NOT NULL,
    pets_allowed BOOLEAN NOT NULL,
    available_from TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS properties (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    price DECIMAL NOT NULL,
    type TEXT NOT NULL,
    amenities TEXT[] DEFAULT '{}',
    location_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,
    specifications_id BIGINT REFERENCES specifications(id) ON DELETE SET NULL,
    utilities_id BIGINT REFERENCES utilities(id) ON DELETE SET NULL,
    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
    lease_terms_id BIGINT REFERENCES lease_terms(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create updated_at triggers for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_specifications_updated_at
    BEFORE UPDATE ON specifications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_utilities_updated_at
    BEFORE UPDATE ON utilities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lease_terms_updated_at
    BEFORE UPDATE ON lease_terms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE utilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE lease_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust these according to your authentication needs)
CREATE POLICY "Enable read access for all users" ON locations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON specifications FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON utilities FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON agents FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON lease_terms FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON properties FOR SELECT USING (true);

-- You might want to add more restrictive policies for INSERT, UPDATE, and DELETE
-- based on your authentication requirements
