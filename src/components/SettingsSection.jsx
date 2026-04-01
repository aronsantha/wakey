export default function SettingsSection({ title, children }) {
  return (
    <div className="mb-2 border-neutral-900 bg-neutral-950 p-5 first:rounded-t-2xl last:rounded-b-2xl last:border-0">
      <h2 className="mb-0.5 font-bold">{title}</h2>
      <div className="[&>p]:text-xs [&>p]:text-neutral-500">{children}</div>
    </div>
  );
}
