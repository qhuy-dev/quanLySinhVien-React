import clsx from 'clsx'

export default function Card({ as: Tag = 'section', className, children, ...props }) {
  return (
    <Tag className={clsx('rounded-[10px] border border-line bg-white', className)} {...props}>
      {children}
    </Tag>
  )
}

// Tiêu đề card có icon (Thông tin cá nhân, Thông tin học tập…)
export function CardTitle({ icon: Icon, children, className }) {
  return (
    <h2 className={clsx('flex items-center gap-2.5 text-[16px] leading-[1.45] font-semibold text-ink', className)}>
      {Icon && <Icon size={19} className="text-primary" />}
      {children}
    </h2>
  )
}
