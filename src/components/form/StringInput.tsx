import { Flex, Input, Text } from "@chakra-ui/react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

export const StringInput = <FormValues extends FieldValues>({
  field,
  title,
  register,
  error,
  desc,
  isFrozen = false,
  type = "text",
}: {
  field: Path<FormValues>;
  title: string | null;
  register: UseFormRegister<FormValues>;
  error: FieldErrors<FormValues>[Path<FormValues>];
  desc?: string | null;
  isFrozen?: boolean;
  type?: "text" | "number";
}) => (
  <Flex flexDir="column">
    <Text color="cream.100" fontWeight="bold" fontSize="xl">
      {title}
    </Text>
    {desc && (
      <Text color="cream.200" fontWeight="bold" fontSize="sm">
        {desc}
      </Text>
    )}
    <Input
      type={type}
      mx="auto"
      {...(type == "number"
        ? register(field, { valueAsNumber: true })
        : register(field))}
      borderColor={error?.message ? "salmon" : undefined}
      isDisabled={isFrozen}
    />
    <Text color="salmon" h="1em">
      {error?.message ? (error.message as string) : ""}
    </Text>
  </Flex>
);
