import { useSession } from 'next-auth/react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import ExpenseGraph from '../../components/dashboard/ExpenseGraph';
import Expense from '../../types/Expense';
import { useEffect, useMemo, useState } from 'react';
import { ParentSize } from '@visx/responsive';

const DashboardIndex = () => {
  const session = useSession();
  const [data, setData] = useState<Expense[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.data.user.accessToken}`,
      },
    }).then((res) => {
      res.json().then((res: Expense[]) => setData(res));
    });
  }, []);

  const mappedData = useMemo(() => {
    const result = new Map<string, Expense>();
    data.forEach((expense) => {
      const dayDate = expense.createdAt.toString().split('T')[0];
      if (result.has(dayDate)) {
        result.get(dayDate).value += expense.value;
      } else {
        result.set(dayDate, expense);
      }
    });
    return [...result.values()];
  }, [data]);

  return (
    <div className="flex flex-row h-screen w-screen">
      <DashboardNavbar selected="Overview" />
      <div className="bg-card-background shadow-xl w-full max-h-1/2 rounded-3xl m-16 px-8 pt-8 pb-24">
        <h1 className="text-4xl text-text-secondary font-heading mb-4">
          Your expenses
        </h1>
        <div className="h-full">
          { mappedData.length > 0 &&
            <ParentSize>
              {(parent) =>
                !!mappedData && (
                  <ExpenseGraph
                    data={mappedData}
                    width={parent.width}
                    height={parent.height}
                  />
                )
              }
            </ParentSize>
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardIndex;
