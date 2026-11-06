"use client";

import Link from "next/link";
import { BookmarkSimple } from "@phosphor-icons/react";
import { Button } from "@mantine/core";
import { properties } from "@/data/properties";
import { useTenantPortal } from "../TenantPortalProvider";
import { FavoritePropertyCard } from "./FavoritePropertyCard";

export function TenantFavoritesContent() {
  const { favorites, removeFavorite } = useTenantPortal();
  const favoriteProperties = favorites.map((favorite) => properties.find((property) => property.id === favorite.propertyId)).filter((property): property is typeof properties[number] => Boolean(property));

  return <div className="tenantFavoritesPage"><div className="tenantPageIntro"><p className="sectionKicker">Saved places</p><h2>My favorites</h2><p>Keep the places that feel right close by while you compare your options.</p></div><div className="tenantSessionNotice">Your favorites are saved for this frontend session only. They will not be permanently stored yet.</div>{favoriteProperties.length ? <div className="tenantFavoriteGrid">{favoriteProperties.map((property) => <FavoritePropertyCard key={property.id} property={property} onRemove={removeFavorite} />)}</div> : <div className="tenantFavoritesEmpty"><span className="tenantEmptyIcon"><BookmarkSimple size={30} weight="duotone" /></span><h3>No saved places yet</h3><p>Save a property while browsing and it will appear here for this session.</p><Button component={Link} href="/properties" color="silong">Browse available places</Button></div>}</div>;
}
