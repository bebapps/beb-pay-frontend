import { useAuthentication } from '../../hooks/useAuthentication';
import Button from '../inputs/Button';
import Logo from '../Logo';
import ManagementPath from '../../enums/ManagementPath';
import css from './Sidebar.module.scss';
import SidebarOption from './SidebarOption';

const tabs = [
  { id: ManagementPath.branding, title: 'Branding', subtitle: 'Setup branding' },
  { id: ManagementPath.products, title: 'Products', subtitle: 'Add products and deals' },
  { id: ManagementPath.experience, title: 'Experience', subtitle: 'Customize the user experience' },
  { id: ManagementPath.details, title: 'Your details', subtitle: 'Enter your legal and payment details' },
  { id: ManagementPath.webhooks, title: 'Webhooks', subtitle: 'Setup webhooks when things happen' },
  { id: ManagementPath.monitors, title: 'Monitors', subtitle: 'See when purchases happen' },
  { id: ManagementPath.launch, title: 'Launch', subtitle: 'Go live' },
];

const Sidebar: React.FC = () => {
  const { logout } = useAuthentication();

  return (
    <div className={css.Sidebar}>
      <div className={css.Sidebar__logo}>
        <Logo />
      </div>
      <nav className={css.Sidebar__navigation}>
        <ul className={css.Sidebar__navigation__options}>
          {tabs.map(({ id, title, subtitle }) => (
            <li key={id} >
              <SidebarOption
                title={title}
                subtitle={subtitle}
                path={id}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className={css.Sidebar__account}>
        <Button
          className={css.Sidebar__account__logout}
          variant="none"
          onClick={logout}
        >
          logout
      </Button>
      </div>
    </div>
  );
};

export default Sidebar;
