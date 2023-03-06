import Script from 'next/script'
import {
  ActionIcon,
  Box,
  Button,
  createStyles,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {
  IconMessageCircle,
  IconMoonStars,
  IconSettings,
  IconSun,
  IconTemplate,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  path: string;
}
function MenuItem({ icon, text, path }: MenuItemProps) {
  const { pathname } = useRouter();

  return (
    <Link href={path}>
      <Button
        leftIcon={icon}
        variant="subtle"
        color={pathname.startsWith(path) ? "blue" : "primary"}
      >
        {text}
      </Button>
    </Link>
  );
}

function Menu() {
  return (
    <Stack spacing="xs" align="stretch">
      <MenuItem path="/chats" text="Chats" icon={<IconMessageCircle />} />
      <MenuItem path="/templates" text="Templates" icon={<IconTemplate />} />
    </Stack>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    height: "70px",
    borderBottom: "1px solid #eaeaea",
    // backgroundColor: "red",
  },
  menu: {
    height: "calc(100vh - 70px)",
    padding: "32px",
    borderRight: "1px solid #eaeaea",
    // backgroundColor: "blue",
  },
  main: {
    height: "calc(100vh - 70px)",
    // backgroundColor: "green",
  },
}));

export function MainLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const [isMenuOpened, toggleMenuOpened] = useToggle();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const { classes } = useStyles();
  return (
    <>
      <Script
        id="posthog"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_S4BHx6fmXOi3pMh7fzSlg6OggCzzZfQpKy4qVRAvxAU',{api_host:'https://eu.posthog.com'})`,
        }}
      />
      <Paper
        h="70px"
        pos="fixed"
        top={0}
        left={0}
        w="100%"
        shadow="xs"
        sx={{ zIndex: 100 }}
      >
        <Group w="100%" h="100%">
          <Link href="/">
            <Group pl={32} align="center" w="max-content">
              <Box h={50} w={140} sx={{ aspectRatio: "1" }} pos="relative">
                <Image
                  src="/voiceflow.svg"
                  alt="logo"
                  fill
                  style={{
                    objectFit: "contain",
                    filter: `invert(${dark ? "1" : "0"}) sepia(0) saturate(1) hue-rotate(0deg) brightness(1) contrast(1)`,
                  }}
                />
              </Box>

              <Text color={dark ? "white" : "blue"} weight="bold" size="2em">
                Chat GPT
              </Text>
            </Group>
          </Link>

          <ActionIcon
            variant="filled"
            ml="auto"
            mr={64}
            color={dark ? "blue" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
        </Group>
      </Paper>

      <Grid mt="70px">
        <Grid.Col className={classes.menu} span={2}>
          <Menu />
        </Grid.Col>
        <Grid.Col className={classes.main} span={10}>
          <main id="main">{children}</main>
        </Grid.Col>
      </Grid>
    </>
  );
}
