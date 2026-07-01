-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS car_media CASCADE;
DROP TABLE IF EXISTS delivery_requests CASCADE;
DROP TABLE IF EXISTS buy_requests CASCADE;
DROP TABLE IF EXISTS listings_requests CASCADE;
DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'user'
);

-- Create cars table
CREATE TABLE cars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    condition TEXT NOT NULL,
    price NUMERIC NOT NULL,
    status TEXT DEFAULT 'available',
    description TEXT,
    mileage INTEGER,
    exterior_color TEXT,
    interior_color TEXT,
    transmission TEXT,
    fuel_type TEXT
);

-- Create car_media table
CREATE TABLE car_media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT FALSE
);

-- Create listings_requests table
CREATE TABLE listings_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    condition TEXT NOT NULL,
    price NUMERIC NOT NULL,
    description TEXT,
    media_urls TEXT[],
    status TEXT DEFAULT 'pending'
);

-- Create buy_requests table
CREATE TABLE buy_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    condition TEXT NOT NULL,
    asking_price NUMERIC,
    notes TEXT,
    status TEXT DEFAULT 'pending'
);

-- Create delivery_requests table
CREATE TABLE delivery_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    status TEXT DEFAULT 'pending'
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE buy_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_requests ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Cars Policies
CREATE POLICY "Cars are viewable by everyone" ON cars FOR SELECT USING (true);
CREATE POLICY "Only admins can insert cars" ON cars FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Only admins can update cars" ON cars FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Only admins can delete cars" ON cars FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Car Media Policies
CREATE POLICY "Car media is viewable by everyone" ON car_media FOR SELECT USING (true);
CREATE POLICY "Only admins can manage car media" ON car_media FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Listings Requests Policies
CREATE POLICY "Users can view own listing requests" ON listings_requests FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Users can insert own listing requests" ON listings_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update listing requests" ON listings_requests FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Buy Requests Policies
-- Allowing anonymous inserts since WeBuyCars form doesn't require auth
CREATE POLICY "Anyone can insert buy requests" ON buy_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view buy requests" ON buy_requests FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Admins can update buy requests" ON buy_requests FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Delivery Requests Policies
CREATE POLICY "Users can view own delivery requests" ON delivery_requests FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Users can insert own delivery requests" ON delivery_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update delivery requests" ON delivery_requests FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
