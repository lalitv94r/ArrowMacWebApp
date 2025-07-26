import { Button, Input } from "reactstrap";
import { Href, ImagePath } from "@/Constant";
import { topSellingProductsTableData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";
import Image from "next/image";
import Link from "next/link";

const TopSellingProductsTableBody = () => {
  return (
    <>
      {topSellingProductsTableData.map((item, i) => (
        <tr key={i}>
          <td>
            <Input type="checkbox" />
          </td>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image width={30} height={30} className="img-30 b-r-10" src={item?.image} alt="watch" />
              </div>
              <div className="flex-grow-1">
                <Link href={Href}>
                  <h6 className="f-w-500">{item.productName}</h6>
                  <span className="font-light f-w-400 f-13">{item.date}</span>
                </Link>
              </div>
            </div>
          </td>
          <td>{item.id}</td>
          <td>
            <span className="font-light">{item.email}</span>
          </td>
          <td>{item.stock}</td>
          <td>{item.amount}</td>
          <td>
            <Button color={`light-${item.color}`} className="edge-btn f-13 w-100">
              {item.payment}
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TopSellingProductsTableBody;
