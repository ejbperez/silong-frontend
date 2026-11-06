export default function Loading() {
  return <main className="listingLoading container" aria-busy="true" aria-live="polite"><div className="loadingBar loadingBarWide" /><div className="loadingGrid">{[1, 2, 3].map((item) => <div className="loadingCard" key={item}><div className="loadingImage" /><div className="loadingLine loadingLineShort" /><div className="loadingLine" /><div className="loadingLine loadingLineSmall" /></div>)}</div></main>;
}
