import { ReactNode } from "react";
import {
  AppShell,
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Text,
} from "@mantine/core";
import {
  Icon,
  Logout,
  School,
  ListDetails,
  SwitchVertical,
} from "tabler-icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "./Auth";
import useMode from "./Mode";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: Icon;
  label: string;
  link: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  link,
  onClick,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <div>
        <Link passHref href={link}>
          <UnstyledButton
            onClick={onClick}
            className={cx(classes.link, { [classes.active]: active })}
          >
            <Icon size={24} />
          </UnstyledButton>
        </Link>
      </div>
    </Tooltip>
  );
}

const linkData = {
  teacher: [
    { icon: ListDetails, label: "My Classes", link: "/app/teacher/classes" },
  ],
  student: [
    { icon: School, label: "My Classes", link: "/app/student/classes" },
  ],
};

export function CustomAppNavbar() {
  const router = useRouter();
  const { logout } = useAuth();
  const { userMode, getNextUserMode, toggleUserMode } = useMode();
  const nextUserMode = getNextUserMode();
  const navbarLinkData = linkData[userMode];
  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <Text weight={900}>SMS</Text>
      </Center>
      <Navbar.Section grow mt={20}>
        <Stack justify="center" spacing={0}>
          {navbarLinkData?.map((link) => {
            const active = router.pathname === link.link;
            return (
              <NavbarLink
                {...link}
                key={link.label}
                active={active}
                link={link.link || "/"}
              />
            );
          })}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={SwitchVertical}
            label={`Switch to ${nextUserMode} mode`}
            link={`/app/${nextUserMode}/classes`}
            onClick={() => toggleUserMode()}
          />
          <NavbarLink
            icon={Logout}
            label="Logout"
            link="/login"
            onClick={() => logout()}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default function CustomAppShell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={<CustomAppNavbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
