import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';
import useIsDesktop from '../hooks/useIsDesktop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

interface MenuItem {
  label: string;
  link?: string;
}

interface ListProps {
  items: Array<MenuItem>
}

interface MenuProps {
  title: string;
  items: Array<MenuItem>;
}

const DesktopList: React.FC<ListProps> = ({ items }) => {
  return (
    <div className={[styles.list, styles.rowContainer].join(' ')}>
      {
        items.map((item, index) =>
          <div key={index} className={[styles.listItem, styles.horizontalListItem].join(' ')}>
            <Link href={item.link ? item.link : '#'}>
              <a>{item.label}</a>
            </Link>
          </div>
        )
      }
    </div>
  );
};

const MobileList: React.FC<ListProps> = ({ items }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <div className={styles.burger}>
        <FontAwesomeIcon
          icon={clicked ? faTimes : faBars}
          onClick={() => setClicked(!clicked)}
        />
      </div>
      {true &&
        <div className={[styles.overlay, clicked ? styles.open : styles.close].join(' ')} onClick={() => setClicked(!clicked)}>
          <div className={[styles.fullHeight, styles.fullWidth, styles.rowContainer, styles.centerContent].join(' ')}>
            <div className={[styles.fullHeight, styles.fullWidth, styles.colContainer, styles.centerContent].join(' ')}>
              <div className={styles.colContainer}>
                {
                  items.map((item, index) =>
                    <div key={index} className={[styles.listItem, styles.verticalListItem].join(' ')}>
                      <Link href={item.link ? item.link : '#'}>
                        <a>{item.label}</a>
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

const Menu: React.FC<MenuProps> = ({
  title,
  items
}) => {
  const isDesktop = useIsDesktop();

  return ( 
    <>
      <div className={[styles.rowContainer, styles.menu].join(' ')}>
        <span className={styles.title}>{title}</span>
        {isDesktop
          ? <DesktopList items={items} />
          : <MobileList items={items} />
        }
      </div>
    </>
  );
}

export default Menu;
