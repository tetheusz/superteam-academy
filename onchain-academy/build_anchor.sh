#!/bin/bash
source $HOME/.cargo/env
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
cd /mnt/c/Users/Ghaxt/Desktop/bountie/superteam-academy/onchain-academy
anchor build
