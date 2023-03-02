NPROCS = $(shell sysctl hw.ncpu  | grep -o '[0-9]\+')
MAKEFLAGS += -j$(NPROCS)

up-client:
	cd 'client' && npm update @bailey-1/classrooms-common

up-server:
	cd 'server' && npm update @bailey-1/classrooms-common

update-commons: up-client up-server
