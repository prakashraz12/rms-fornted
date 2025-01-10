import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SquareTable } from "./tablesShapes/squareTable";
import { RectangularTable } from "./tablesShapes/rectangularTable";
import { LargeTable } from "./tablesShapes/largeTable";
import { useCreateTableMutation } from "@/services/api/floorApi";
import { Loader2 } from "lucide-react";
import useGetTables from "@/hooks/useGetTables";

const schema = yup
  .object({
    tableName: yup
      .string()
      .min(2, "Table name must be at least 2 characters")
      .required("Table name is required"),
    chairCount: yup
      .number()
      .positive("Chair count must be a positive number")
      .integer("Chair count must be a whole number")
      .required("Chair count is required"),
    tableType: yup
      .string()
      .oneOf(["S", "M", "L"], "Please select a valid table type")
      .required("Table type is required"),
    description: yup.string(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const tableTypes = [
  { value: "S", label: "s" },
  { value: "M", label: "m" },
  { value: "L", label: "l" },
];

export function TableCreateForm({ floorId }: { floorId: number }) {
  const { setFloorData, floorData } = useGetTables();

  const [createTable, { isLoading, isSuccess, data }] =
    useCreateTableMutation();

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tableName: "",
      chairCount: 0,
      tableType: undefined,
    },
  });

  async function onSubmit(values: FormData) {
    await createTable({
      name: values.tableName,
      chairs: values.chairCount,
      tableType: values.tableType,
      floorId: floorId,
    });
  }

  React.useEffect(() => {
    if (isSuccess) {
      form.reset();
      setFloorData(
        floorData?.map((floor) => {
          if (floor.id === data?.data.floorId) {
            console.log("hi there");
            return {
              ...floor,
              tables: [...floor.tables, data?.data],
            };
          }
          return floor;
        }) || []
      );
    }
  }, [isSuccess]);

  console.log(data?.data);
  console.log(floorData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto p-2 sm:p-4 md:p-6"
    >
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg sm:text-xl font-bold">Create New Table</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="tableName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Table Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter table name"
                        className="text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chairCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Number of Chairs
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter number of chairs"
                        className="text-sm sm:text-base"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tableType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Table Type
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-4 justify-between"
                    >
                      {tableTypes.map((type) => (
                        <FormItem key={type.value}>
                          <FormControl>
                            <RadioGroupItem
                              value={type.value}
                              id={type.value}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <Label htmlFor={type.value}>
                            <div className="p-6">
                              {type.value === "S" && (
                                <SquareTable
                                  size="s"
                                  isCreator={false}
                                  isSelected={field.value === "S"}
                                />
                              )}
                              {type.value === "M" && (
                                <RectangularTable
                                  size="small"
                                  isSelected={field.value === "M"}
                                />
                              )}
                              {type.value === "L" && (
                                <LargeTable
                                  size="s"
                                  isSelected={field.value === "L"}
                                />
                              )}
                            </div>
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  " Create Table"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function Label({ className, children, ...props }: LabelProps) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}
