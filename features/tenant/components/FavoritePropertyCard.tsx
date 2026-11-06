import Link from "next/link";
import { ArrowRight, Heart, MapPin, Trash } from "@phosphor-icons/react";
import { ResilientImage } from "@/components/media/ResilientImage";
import type { Property } from "@/types/property";

export function FavoritePropertyCard({ property, onRemove }: { property: Property; onRemove: (propertyId: string) => void }) {
  return <article className="tenantFavoriteCard"><div className="tenantFavoriteImage"><Link href={`/properties/${property.slug}`} aria-label={`View ${property.name}`}><ResilientImage src={property.image} alt={`${property.name} accommodation`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized /></Link><span className="tenantFavoriteBadge"><Heart size={15} weight="fill" /> Saved</span></div><div className="tenantFavoriteBody"><div><p className="eyebrow">{property.barangay}</p><h3><Link href={`/properties/${property.slug}`}>{property.name}</Link></h3><p className="tenantFavoriteLocation"><MapPin size={15} /> {property.city}</p></div><div className="tenantFavoriteMeta"><strong>₱{property.monthlyFrom.toLocaleString()}</strong><span>/ month</span></div><div className="tenantFavoriteActions"><Link className="tenantInlineLink" href={`/properties/${property.slug}`}>View details <ArrowRight size={16} /></Link><button type="button" className="tenantRemoveButton" onClick={() => onRemove(property.id)}><Trash size={16} /> Remove</button></div></div></article>;
}
