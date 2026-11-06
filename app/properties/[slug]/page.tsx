import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Divider } from "@mantine/core";
import { ArrowLeft, Check, MapPin, ShieldCheck, Star } from "@phosphor-icons/react/dist/ssr";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ResilientImage } from "@/components/media/ResilientImage";
import { getProperty, properties } from "@/data/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);

  return {
    title: property ? `${property.name} | Silong` : "Place not found | Silong",
    description: property?.description ?? "Explore comfortable places to stay in Taguig City.",
    openGraph: property ? { title: `${property.name} | Silong`, description: property.description, images: [property.image] } : undefined,
  };
}

export default async function PropertyDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  return <><Header /><main className="detailPage"><div className="container">
    <Link className="backLink" href="/properties"><ArrowLeft size={17} /> Back to places</Link>
    <div className="gallery"><div className="galleryMain"><ResilientImage src={property.images[0]} alt={`${property.name} exterior`} fill priority sizes="(max-width: 800px) 100vw, 65vw" unoptimized /></div><div className="gallerySide">{property.images.slice(1, 3).map((image, index) => <div className="galleryThumb" key={image}><ResilientImage src={image} alt={`${property.name} view ${index + 2}`} fill sizes="30vw" unoptimized /></div>)}</div></div>
    <div className="detailGrid"><div><div className="detailHeading"><div><p className="sectionKicker">{property.barangay}, {property.city}</p><h1>{property.name}</h1><p className="propertyLocation"><MapPin size={16} /> {property.address}</p></div><span className="verifiedPill"><ShieldCheck size={17} weight="fill" /> Verified</span></div><p className="detailDescription">{property.description}</p><Divider my="xl" />
      <h2 className="subheading">Available rooms</h2>{property.rooms.length > 0 ? <div className="roomList">{property.rooms.map((room) => <div className="roomRow" key={room.id}><div><span className="roomType">{room.type}</span><h3>{room.name}</h3><p>{room.description}</p><small>{room.capacity === 1 ? "For 1 person" : `Up to ${room.capacity} people`} · {room.genderPolicy}</small></div><div className="roomPrice"><strong>₱{room.price.toLocaleString()}</strong><span>/ month</span><b>{room.availableUnits} available</b></div></div>)}</div> : <div className="emptyState compactEmpty"><h3>No rooms are available right now</h3><p>Check back soon for new availability at this place.</p></div>}
      <Divider my="xl" /><h2 className="subheading">Amenities</h2><div className="amenityList">{property.amenities.map((amenity) => <span key={amenity}><Check size={16} /> {amenity}</span>)}</div><h2 className="subheading rulesHeading">House rules</h2><ul className="rulesList">{property.houseRules.map((rule) => <li key={rule}>{rule}</li>)}</ul><h2 className="subheading rulesHeading">Approximate location</h2><div className="mapPlaceholder" role="img" aria-label={`Approximate location of ${property.name} in ${property.city}`}><MapPin size={30} weight="fill" /><strong>{property.barangay}, {property.city}</strong><span>Exact location shared after a reservation request.</span></div>
    </div><aside className="reservationPanel"><div className="reservationPrice"><span>Rooms from</span><strong>₱{property.monthlyFrom.toLocaleString()}</strong><small>/ month</small></div><div className="landlord"><div className="avatar" aria-hidden="true">{property.landlord.initials}</div><div><strong>{property.landlord.name}</strong><span><Star size={14} weight="fill" /> Responds to {property.landlord.responseRate}% of messages</span></div></div><Button fullWidth size="lg" color="silong">Request to reserve</Button><p className="panelNote">No payment required now. The landlord will review your request.</p></aside></div>
  </div></main><Footer /></>;
}
