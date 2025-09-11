export default function CustomIcons({ name, variant = 'primary', size = 40, className = 'logo-home', ...rest }) {
  return (
    <i
      data-icon={name}
      className={`icon icon-${name} icon-${variant} ${className}`}
      style={{ fontSize: size }} 
      {...rest}
    />
  );
}
