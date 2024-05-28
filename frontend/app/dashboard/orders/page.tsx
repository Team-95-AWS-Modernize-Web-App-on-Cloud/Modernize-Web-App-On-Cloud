import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/CheckoutButton";
import PageTitle from "@/components/PageTitle";

export default function Order() {
  return (
    <div>
      <PageTitle title="Orders" className="px-5 md:px-0" />
      <div className="flex flex-col gap-6 md:flex-row md:p-6">
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Your Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <img
                        alt="Product 1"
                        className="h-12 w-12 object-cover"
                        height="50"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "50/50",
                          objectFit: "cover",
                        }}
                        width="50"
                      />
                    </TableCell>
                    <TableCell className="font-medium">Product 1</TableCell>
                    <TableCell>
                      <input
                        className="w-12 rounded-md border text-center"
                        defaultValue="1"
                        min="1"
                        type="number"
                      />
                    </TableCell>
                    <TableCell>$100.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <img
                        alt="Product 2"
                        className="h-12 w-12 object-cover"
                        height="50"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "50/50",
                          objectFit: "cover",
                        }}
                        width="50"
                      />
                    </TableCell>
                    <TableCell className="font-medium">Product 2</TableCell>
                    <TableCell>
                      <input
                        className="w-12 rounded-md border text-center"
                        defaultValue="2"
                        min="1"
                        type="number"
                      />
                    </TableCell>
                    <TableCell>$200.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex justify-between">
                <div>Subtotal</div>
                <div>$300.00</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Discount</div>
                <div>- $30.00</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Tax</div>
                <div>$27.00</div>
              </div>
              <div className="mb-4 flex justify-between">
                <div>Shipping</div>
                <div>$10.00</div>
              </div>
              <div className="flex justify-between font-bold">
                <div>Total</div>
                <div>$307.00</div>
              </div>
              <CheckoutButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
