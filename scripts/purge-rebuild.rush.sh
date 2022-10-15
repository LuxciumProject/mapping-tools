#!/bin/sh
pwd

rush purge
rush update --full
rush rebuild
