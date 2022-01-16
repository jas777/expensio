import Link from 'next/link';
import React, { useState } from 'react';
import { HomeIcon } from '@heroicons/react/solid';
import { CreditCardIcon, FireIcon } from '@heroicons/react/outline';

interface NavbarElementProps {
  label: string;
  href: string;
  icon: JSX.Element;
}

const NavbarElement = ({ label, href, icon }: NavbarElementProps) => {
  return (
    <div className="hover:bg-background transition-all duration-200 p-2 rounded-md flex flex-col">
      <Link href={href}>
        <a className="inline-block">
          {icon}
          <span className="text-xl text-text-secondary inline-block align-bottom ml-4">
            {label}
          </span>
        </a>
      </Link>
    </div>
  );
};

const DashboardNavbar = ({ selected }: { selected?: string }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(selected);

  const elementStyle = (elementName: string) => {
    return `${
      selectedItem === elementName
        ? 'bg-primary fill-background rounded-md p-2'
        : 'stroke-text-secondary'
    } h-10 inline-block align-bottom navbarIcon opacity-75`;
  };

  return (
    <div className="flex flex-col p-4 bg-card-background shadow-xl w-72 rounded-xl m-4 self-center">
      <ul className="font-medium font-heading">
        <li>
          <NavbarElement
            label="Overview"
            href="/dashboard"
            icon={
              <HomeIcon
                className={`${elementStyle('Overview')} fill-card-background`}
                style={{ strokeWidth: '1px' }}
              />
            }
          />
          <NavbarElement
            label="Expenses"
            href="/dashboard"
            icon={<CreditCardIcon className={elementStyle('Expenses')} />}
          />
          <NavbarElement
            label="Goals"
            href="/dashboard"
            icon={<FireIcon className={elementStyle('Goals')} />}
          />
        </li>
      </ul>
    </div>
  );
};
export default DashboardNavbar;
