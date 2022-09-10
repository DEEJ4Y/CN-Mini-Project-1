import { createStyles, Container, Text, Button, Group } from "@mantine/core";
import Link from "next/link";
import { Login, Pencil } from "tabler-icons-react";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export function HeroTitle() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container fluid py={40} className={classes.inner}>
        <h1 className={classes.title}>
          Easily{" "}
          <Text component="span" variant="gradient" inherit>
            Manage Your Classroom
          </Text>{" "}
          from a single place.
        </h1>

        <Text className={classes.description} color="dimmed">
          Student Management System keeps all your student data in one place,
          conveniently available for you 24/7. Easily export your student data
          to a format that suits your needs.
        </Text>

        <Group className={classes.controls}>
          <Link passHref href="/signup">
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              leftIcon={<Pencil size={20} />}
            >
              Get started
            </Button>
          </Link>

          <Link passHref href="/login">
            <Button
              component="a"
              size="xl"
              variant="default"
              className={classes.control}
              leftIcon={<Login size={20} />}
            >
              Login
            </Button>
          </Link>
        </Group>
      </Container>
    </div>
  );
}
