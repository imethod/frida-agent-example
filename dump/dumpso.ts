

export class DumpSo {
    soName: string
    path: string
    libso: Module | null
    constructor(soName: string, path: string) {
        this.soName = soName
        this.path = path
        this.libso = Process.findModuleByName(this.soName);
    }


    dump() {
        if (this.libso == null) {
            return -1;
        }

        var file_path = this.path + "/" + this.soName;
        var file_handle = new File(file_path, "wb");
        if (file_handle && file_handle != null) {

            Memory.protect(ptr(this.libso.base.toInt32()), this.libso.size, 'rwx');
            var libso_buffer = ptr(this.libso.base.toInt32()).readByteArray(this.libso.size);

            // this.patchGot(libso_buffer!)
            var pGot = new Uint32Array(libso_buffer!, 0xa2984, 0x678 / 4)
            
            //创建extern 表
            var table = [{ key: 0xC2000, value: "__cxa_finalize" }, { key: 0xC2004, value: "__cxa_atexit" }, { key: 0xC2008, value: "__stack_chk_fail" }, { key: 0xC200C, value: "__stack_chk_guard" }, { key: 0xC2010, value: "strncmp" }, { key: 0xC2014, value: "strlen" }, { key: 0xC2018, value: "memcpy" }, { key: 0xC201C, value: "__system_property_get" }, { key: 0xC2020, value: "fseek" }, { key: 0xC2024, value: "ftell" }, { key: 0xC2028, value: "free" }, { key: 0xC202C, value: "memset" }, { key: 0xC2030, value: "malloc" }, { key: 0xC2034, value: "strchr" }, { key: 0xC2038, value: "strstr" }, { key: 0xC203C, value: "dlopen" }, { key: 0xC2040, value: "dlsym" }, { key: 0xC2044, value: "strcasecmp" }, { key: 0xC2048, value: "strcmp" }, { key: 0xC204C, value: "atoi" }, { key: 0xC2050, value: "strcpy" }, { key: 0xC2054, value: "access" }, { key: 0xC2058, value: "mkdir" }, { key: 0xC205C, value: "opendir" }, { key: 0xC2060, value: "unlink" }, { key: 0xC2064, value: "closedir" }, { key: 0xC2068, value: "readdir" }, { key: 0xC206C, value: "fscanf" }, { key: 0xC2070, value: "getpid" }, { key: 0xC2074, value: "usleep" }, { key: 0xC2078, value: "open" }, { key: 0xC207C, value: "write" }, { key: 0xC2080, value: "close" }, { key: 0xC2084, value: "strncasecmp" }, { key: 0xC2088, value: "__errno" }, { key: 0xC208C, value: "AAsset_close" }, { key: 0xC2090, value: "AAsset_getLength" }, { key: 0xC2094, value: "AAsset_getBuffer" }, { key: 0xC2098, value: "AAssetManager_fromJava" }, { key: 0xC209C, value: "AAssetManager_open" }, { key: 0xC20A0, value: "abort" }, { key: 0xC20A4, value: "remove" }, { key: 0xC20A8, value: "strcat" }, { key: 0xC20AC, value: "rewind" }, { key: 0xC20B0, value: "stat" }, { key: 0xC20B4, value: "sleep" }, { key: 0xC20B8, value: "mmap" }, { key: 0xC20BC, value: "__android_log_print" }, { key: 0xC20C0, value: "readlink" }, { key: 0xC20C4, value: "symlink" }, { key: 0xC20C8, value: "strrchr" }, { key: 0xC20CC, value: "fstat" }, { key: 0xC20D0, value: "memcmp" }, { key: 0xC20D4, value: "sscanf" }, { key: 0xC20D8, value: "fgetc" }, { key: 0xC20DC, value: "getenv" }, { key: 0xC20E0, value: "kill" }, { key: 0xC20E4, value: "pthread_mutex_init" }, { key: 0xC20E8, value: "memchr" }, { key: 0xC20EC, value: "memmove" }, { key: 0xC20F0, value: "raise" }, { key: 0xC20F4, value: "pthread_mutex_unlock" }, { key: 0xC20F8, value: "pthread_mutex_lock" }, { key: 0xC20FC, value: "fputwc" }, { key: 0xC2100, value: "mprotect" }, { key: 0xC2104, value: "strncpy" }, { key: 0xC2108, value: "strtok" }, { key: 0xC210C, value: "exit" }, { key: 0xC2110, value: "environ" }, { key: 0xC2114, value: "setenv" }, { key: 0xC2118, value: "setpgid" }, { key: 0xC211C, value: "read" }, { key: 0xC2120, value: "fork" }, { key: 0xC2124, value: "waitpid" }, { key: 0xC2128, value: "dladdr" }, { key: 0xC212C, value: "flock" }, { key: 0xC2130, value: "lseek64" }, { key: 0xC2134, value: "fwrite" }, { key: 0xC2138, value: "lseek" }, { key: 0xC213C, value: "munmap" }, { key: 0xC2140, value: "__signbit" }, { key: 0xC2144, value: "__isfinite" }, { key: 0xC2148, value: "fopen" }, { key: 0xC214C, value: "fclose" }, { key: 0xC2150, value: "fgets" }, { key: 0xC2154, value: "fread" }, { key: 0xC2158, value: "__aeabi_atexit" }, { key: 0xC215C, value: "fprintf" }, { key: 0xC2160, value: "__sF" }, { key: 0xC2164, value: "__assert2" }, { key: 0xC2168, value: "fputc" }, { key: 0xC216C, value: "vasprintf" }, { key: 0xC2170, value: "fflush" }, { key: 0xC2174, value: "pwrite" }, { key: 0xC2178, value: "realloc" }, { key: 0xC217C, value: "calloc" }, { key: 0xC2180, value: "cacheflush" }, { key: 0xC2184, value: "inotify_init" }, { key: 0xC2188, value: "strdup" }, { key: 0xC218C, value: "inotify_rm_watch" }, { key: 0xC2190, value: "setjmp" }, { key: 0xC2194, value: "select" }, { key: 0xC2198, value: "ioctl" }, { key: 0xC219C, value: "strerror" }, { key: 0xC21A0, value: "lstat" }, { key: 0xC21A4, value: "inotify_add_watch" }, { key: 0xC21A8, value: "time" }, { key: 0xC21AC, value: "localtime" }, { key: 0xC21B0, value: "strftime" }, { key: 0xC21B4, value: "fputs" }, { key: 0xC21B8, value: "pthread_exit" }, { key: 0xC21BC, value: "sigaction" }, { key: 0xC21C0, value: "pthread_kill" }, { key: 0xC21C4, value: "_ctype_" }, { key: 0xC21C8, value: "prctl" }, { key: 0xC21CC, value: "siglongjmp" }, { key: 0xC21D0, value: "socket" }, { key: 0xC21D4, value: "connect" }, { key: 0xC21D8, value: "gettimeofday" }, { key: 0xC21DC, value: "clock_gettime" }, { key: 0xC21E0, value: "bsd_signal" }, { key: 0xC21E4, value: "sigsetjmp" }, { key: 0xC21E8, value: "_exit" }, { key: 0xC21EC, value: "strcasestr" }, { key: 0xC21F0, value: "pipe" }, { key: 0xC21F4, value: "wait" }, { key: 0xC21F8, value: "ptrace" }, { key: 0xC21FC, value: "pclose" }, { key: 0xC2200, value: "atol" }, { key: 0xC2204, value: "popen" }, { key: 0xC2208, value: "pthread_create" }, { key: 0xC220C, value: "dlclose" }, { key: 0xC2210, value: "rename" }, { key: 0xC2214, value: "_tolower_tab_" }, { key: 0xC2218, value: "_toupper_tab_" }, { key: 0xC221C, value: "inflate" }, { key: 0xC2220, value: "crc32" }, { key: 0xC2224, value: "inflateEnd" }, { key: 0xC2228, value: "get_crc_table" }, { key: 0xC222C, value: "inflateInit2_" }, { key: 0xC2230, value: "deflate" }, { key: 0xC2234, value: "deflateEnd" }, { key: 0xC2238, value: "deflateInit2_" }, { key: 0xC223C, value: "srand48" }, { key: 0xC2240, value: "lrand48" }, { key: 0xC2244, value: "fdopen" }, { key: 0xC2248, value: "strncat" }, { key: 0xC224C, value: "strtol" }, { key: 0xC2250, value: "__aeabi_memcpy" }, { key: 0xC2254, value: "__aeabi_memclr8" }, { key: 0xC2258, value: "__aeabi_memclr" }, { key: 0xC225C, value: "pthread_setspecific" }, { key: 0xC2260, value: "pthread_once" }, { key: 0xC2264, value: "pthread_getspecific" }, { key: 0xC2268, value: "pthread_key_create" }, { key: 0xC226C, value: "pthread_cond_wait" }, { key: 0xC2270, value: "pthread_cond_broadcast" }, { key: 0xC2274, value: "__aeabi_memmove" }, { key: 0xC2278, value: "__aeabi_memclr4" }, { key: 0xC227C, value: "__gnu_Unwind_Find_exidx" }, { key: 0xC2280, value: "__aeabi_memset8" }]
            var base =this.libso.base
            for (var i = 0; i < pGot.length; i++) {
                var addr = pGot[i]
                var funcName = DebugSymbol.fromAddress(ptr(addr)).toString().split("!")[1]
                logd("pgot1:" + i + " " + ptr(addr) + " " + funcName)
                table.forEach(function (item: any) {
                    var name = item["value"].toString()
                    if (funcName?.indexOf(name) !=-1 && funcName?.length > 0) {
                        pGot[i] = ptr(item["key"]).add(base).toUInt32()
                        logd("replace pgot:" + i + funcName + "  " + ptr(addr) +" "+ name + " to " + ptr(item["key"]))
                        return
                    }
                })

            }
            logd(pGot.toString())
            
            file_handle.write(libso_buffer!);
            file_handle.flush();
            file_handle.close();
            log("[dump]:"+ file_path);
        }
    }
    patchGot(buffer: ArrayBuffer) {
        //定位got表
        

    }

}