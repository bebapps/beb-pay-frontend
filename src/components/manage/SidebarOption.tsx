import { NavLink } from 'react-router-dom';
import ManagementPath from '../../enums/ManagementPath';
import css from './SidebarOption.module.scss';

interface SidebarOptionProps {
  title: string;
  subtitle: string;
  path: ManagementPath;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ title, subtitle, path }) => (
  <NavLink
    to={path}
    activeClassName={css['SidebarOption--active']}
    className={css.SidebarOption}
  >
    <div className={css.SidebarOption__title}>
      {title}
    </div>
    <div className={css.SidebarOption__subtitle}>
      {subtitle}
    </div>
  </NavLink>
);

export default SidebarOption;
