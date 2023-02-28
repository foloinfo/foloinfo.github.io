---
title: Installing st simple terminal on ChromeOS with Crostini (Arm CPU)
date: '2023-02-27T15:00:00.000Z'
---

I was using Alacritty on my Chromebook, but I had some issue with rendering (freezes for few seconds frequently) and it was annoying, so I decided to find something else.

I was not sure if it works on arm64, but it seems to work just fine.

```shell
git clone git://git.suckless.org/st
cd st
sudo apt install libx11-dev libxft-dev
```

Running sudo make clean install directly will raise those errors. So you need `libx11-dev libxft-dev` .

```shell
x.c:12:10: fatal error: X11/Xlib.h: No such file or directory
   12 | #include <X11/Xlib.h>
```

```shell
x.c: 15: 10: fatal error: X11 / Xft / Xft.h: No such file or directory
15 | #include < X11 / Xft / Xft.h >
```

Default color scheme is a bit harsh on my eyes, so change theme. Skip if you don't want.
ref: [https://st.suckless.org/patches/solarized/](https://st.suckless.org/patches/solarized/ "https://st.suckless.org/patches/solarized/")

```shell
wget https://st.suckless.org/patches/solarized/st-no_bold_colors-20170623-b331da5.diff
git apply st-no_bold_colors-20170623-b331da5.diff

wget https://st.suckless.org/patches/solarized/st-solarized-dark-0.8.5.diff
git apply st-solarized-dark-0.8.5.diff
```

I also changed font.

```c
// config.h
static char *font = "consolas:pixelsize=16:antialias=true:autohint=true";
```

And install with

```shell
sudo make clean install
# now you should be able to run st.
st
```

It's more convinient if you can directly launch st from the shelf of ChromeOS, so create an entry.

```
[Desktop Entry]
Name=st
Comment=Terminal Emulator
GenericName=Terminal
X-GNOME-FullName=st
Exec=/usr/local/bin/st
Terminal=false
Type=Application
Icon=Terminal
Categories=Terminal;
```

Copy this file with `cp ./st.desktop /.local/share/applications/`, it should appear on the app list.
ref: [How do I add Linux apps to the home screen? - Google Pixelbook Community](https://support.google.com/pixelbook/thread/708306?hl=en\&msgid=715034)

This is the repository with changes above: [https://github.com/foloinfo/st](https://github.com/foloinfo/st "https://github.com/foloinfo/st")
I would recommend first clone from original repository.

Now I feel much snappy terminal on my mobile workspace. Like switching the tmux screen within few ms.&#x20;

Happy coding! 🎉
