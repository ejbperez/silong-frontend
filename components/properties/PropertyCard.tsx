"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, MapPin, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { ResilientImage } from "@/components/media/ResilientImage";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);

  return <article className="propertyCard">
    <div className="propertyImageWrap">
      <Link href={`/properties/${property.slug}`} className="propertyImageLink" aria-label={`View ${property.name}`}>
        <ResilientImage src={property.image} alt={`${property.name} accommodation`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className="propertyImage" unoptimized />
        {property.featured && <span className="imageBadge">Featured</span>}
      </Link>
      <button type="button" className={`favoriteButton ${saved ? "favoriteButtonSaved" : ""}`} aria-label={`${saved ? "Remove" : "Save"} ${property.name}`} aria-pressed={saved} onClick={() => setSaved((current) => !current)}><Heart size={20} weight={saved ? "fill" : "regular"} /></button>
    </div>
    <div className="propertyCardBody"><div className="propertyCardTitle"><div><p className="eyebrow">{property.barangay}</p><h3><Link href={`/properties/${property.slug}`}>{property.name}</Link></h3></div><span className="verifiedMark" title="Verified landlord"><ShieldCheck size={18} weight="fill" /></span></div><p className="propertyLocation"><MapPin size={15} /> {property.distanceLabel}</p><div className="propertyCardMeta"><span>From <strong>₱{property.monthlyFrom.toLocaleString()}</strong> / month</span><span className="availability"><i /> Available</span></div></div>
  </article>;
}
