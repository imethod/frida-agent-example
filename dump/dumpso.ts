

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

            this.patchGot(libso_buffer!)
            // file_handle.write(libso_buffer!);
            // file_handle.flush();
            // file_handle.close();
            // log("[dump]:"+ file_path);
        }
    }
    patchGot(buffer: ArrayBuffer) {
        //定位got表
        var pGot = new Uint32Array(buffer, 0xa2984, 0x678 /4)


        //创建extern 表
        var table = new Array([0xC2000, "int __fastcall _cxa_finalize(void *)"], [0xC2004, "int __fastcall _cxa_atexit(void (__fastcall *lpfunc)(void *), void *obj, void *lpdso_handle)"], [0xC2010, "int strncmp(const char *s1, const char *s2, size_t n)"], [0xC2014, "size_t strlen(const char *s)"], [0xC2018, "void *memcpy(void *dest, const void *src, size_t n)"], [0xC2020, "int fseek(FILE *stream, int off, int whence)"], [0xC2024, "int ftell(FILE *stream)"], [0xC2028, "void free(void *ptr)"], [0xC202C, "void *memset(void *s, int c, size_t n)"], [0xC2030, "void *malloc(size_t size)"], [0xC2034, "char *strchr(const char *s, int c)"], [0xC2038, "char *strstr(const char *haystack, const char *needle)"], [0xC203C, "void *dlopen(const char *file, int mode)"], [0xC2040, "void *dlsym(void *handle, const char *name)"], [0xC2044, "int strcasecmp(const char *s1, const char *s2)"], [0xC2048, "int strcmp(const char *s1, const char *s2)"], [0xC204C, "int atoi(const char *nptr)"], [0xC2050, "char *strcpy(char *dest, const char *src)"], [0xC2054, "int access(const char *name, int type)"], [0xC2058, "int mkdir(const char *path, __mode_t mode)"], [0xC205C, "DIR *opendir(const char *name)"], [0xC2060, "int unlink(const char *name)"], [0xC2064, "int closedir(DIR *dirp)"], [0xC2068, "struct dirent *readdir(DIR *dirp)"], [0xC206C, "int fscanf(FILE *stream, const char *format, ...)"], [0xC2070, "__pid_t getpid(void)"], [0xC2074, "int usleep(__useconds_t useconds)"], [0xC2078, "int open(const char *file, int oflag, ...)"], [0xC207C, "ssize_t write(int fd, const void *buf, size_t n)"], [0xC2080, "int close(int fd)"], [0xC2084, "int strncasecmp(const char *s1, const char *s2, size_t n)"], [0xC208C, "void AAsset_close(AAsset *asset)"], [0xC2090, "off_t AAsset_getLength(AAsset *asset)"], [0xC2094, "const void *AAsset_getBuffer(AAsset *asset)"], [0xC2098, "AAssetManager *AAssetManager_fromJava(JNIEnv *env, jobject assetManager)"], [0xC209C, "AAsset *AAssetManager_open(AAssetManager *mgr, const char *filename, int mode)"], [0xC20A0, "void abort(void)"], [0xC20A4, "int remove(const char *filename)"], [0xC20A8, "char *strcat(char *dest, const char *src)"], [0xC20AC, "void rewind(FILE *stream)"], [0xC20B0, "int stat(const char *file, struct stat *buf)"], [0xC20B4, "unsigned int sleep(unsigned int seconds)"], [0xC20B8, "void *mmap(void *addr, size_t len, int prot, int flags, int fd, __off_t offset)"], [0xC20BC, "int _android_log_print(int prio, const char *tag, const char *fmt, ...)"], [0xC20C0, "ssize_t readlink(const char *path, char *buf, size_t len)"], [0xC20C4, "int symlink(const char *from, const char *to)"], [0xC20C8, "char *strrchr(const char *, int)"], [0xC20CC, "int fstat(int fd, struct stat *buf)"], [0xC20D0, "int memcmp(const void *, const void *, size_t)"], [0xC20D4, "int sscanf(const char *s, const char *format, ...)"], [0xC20D8, "int fgetc(FILE *stream)"], [0xC20DC, "char *getenv(const char *)"], [0xC20E0, "int kill(__pid_t pid, int sig)"], [0xC20E4, "int pthread_mutex_init(pthread_mutex_t *mutex, const pthread_mutexattr_t *mutexattr)"], [0xC20E8, "void *memchr(const void *, int, size_t)"], [0xC20EC, "void *memmove(void *, const void *, size_t)"], [0xC20F0, "int raise(int sig)"], [0xC20F4, "int pthread_mutex_unlock(pthread_mutex_t *mutex)"], [0xC20F8, "int pthread_mutex_lock(pthread_mutex_t *mutex)"], [0xC20FC, "wint_t fputwc(wchar_t wc, __FILE *stream)"], [0xC2100, "int mprotect(void *addr, size_t len, int prot)"], [0xC2104, "char *strncpy(char *, const char *, size_t)"], [0xC2108, "char *strtok(char *, const char *)"], [0xC210C, "void exit(int)"], [0xC2114, "int setenv(const char *, const char *, int)"], [0xC2118, "int setpgid(__pid_t pid, __pid_t pgid)"], [0xC211C, "ssize_t read(int fd, void *buf, size_t nbytes)"], [0xC2120, "__pid_t fork(void)"], [0xC2124, "__pid_t waitpid(__pid_t pid, int *stat_loc, int options)"], [0xC212C, "int flock(int fd, int operation)"], [0xC2134, "size_t fwrite(const void *ptr, size_t size, size_t n, FILE *s)"], [0xC2138, "__off_t lseek(int fd, __off_t offset, int whence)"], [0xC213C, "int munmap(void *addr, size_t len)"], [0xC2148, "FILE *fopen(const char *filename, const char *modes)"], [0xC214C, "int fclose(FILE *stream)"], [0xC2150, "char *fgets(char *s, int n, FILE *stream)"], [0xC2154, "size_t fread(void *ptr, size_t size, size_t n, FILE *stream)"], [0xC215C, "int fprintf(FILE *stream, const char *format, ...)"], [0xC2168, "int fputc(int c, FILE *stream)"], [0xC216C, "int vasprintf(char **, const char *, va_list)"], [0xC2170, "int fflush(FILE *stream)"], [0xC2178, "void *realloc(void *p, size_t byte_count)"], [0xC217C, "void *calloc(size_t item_count, size_t item_size)"], [0xC2184, "int inotify_init(void)"], [0xC2188, "char *strdup(const char *)"], [0xC218C, "int inotify_rm_watch(int fd, uint32_t wd)"], [0xC2190, "int setjmp(jmp_buf env)"], [0xC2194, "int select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout)"], [0xC2198, "int ioctl(int fd, unsigned int request, ...)"], [0xC219C, "char *strerror(int)"], [0xC21A0, "int lstat(const char *file, struct stat *buf)"], [0xC21A4, "int inotify_add_watch(int fd, const char *name, uint32_t mask)"], [0xC21A8, "time_t time(time_t *timer)"], [0xC21AC, "struct tm *localtime(const time_t *timer)"], [0xC21B0, "size_t strftime(char *s, size_t maxsize, const char *format, const struct tm *tp)"], [0xC21B4, "int fputs(const char *s, FILE *stream)"], [0xC21B8, "void pthread_exit(void *retval)"], [0xC21BC, "int sigaction(int sig, const struct sigaction *act, struct sigaction *oact)"], [0xC21C0, "int pthread_kill(pthread_t threadid, int signo)"], [0xC21C8, "int prctl(int option, ...)"], [0xC21CC, "void siglongjmp(sigjmp_buf env, int val)"], [0xC21D0, "int socket(int, int, int)"], [0xC21D4, "int connect(int, const struct sockaddr *, socklen_t)"], [0xC21D8, "int gettimeofday(struct timeval *tv, __timezone_ptr_t tz)"], [0xC21DC, "int clock_gettime(clockid_t clock_id, struct timespec *tp)"], [0xC21E8, "void exit(int status)"], [0xC21EC, "char *strcasestr(const char *haystack, const char *needle)"], [0xC21F0, "int pipe(int pipedes[2])"], [0xC21F4, "__pid_t wait(void *stat_loc)"], [0xC21F8, "int ptrace(enum __ptrace_request request, ...)"], [0xC21FC, "int pclose(FILE *stream)"], [0xC2200, "int atol(const char *)"], [0xC2204, "FILE *popen(const char *command, const char *modes)"], [0xC2208, "int pthread_create(pthread_t *newthread, const pthread_attr_t *attr, void *(*start_routine)(void *), void *arg)"], [0xC220C, "int dlclose(void *handle)"], [0xC2210, "int rename(const char *old, const char *new)"], [0xC221C, "int inflate(z_streamp strm, int flush)"], [0xC2220, "uLong crc32(uLong crc, const Bytef *buf, uInt len)"], [0xC2224, "int inflateEnd(z_streamp strm)"], [0xC2228, "const uLongf *get_crc_table(void)"], [0xC222C, "int inflateInit2_(z_streamp strm, int windowBits, const char *version, int stream_size)"], [0xC2230, "int deflate(z_streamp strm, int flush)"], [0xC2234, "int deflateEnd(z_streamp strm)"], [0xC2238, "int deflateInit2_(z_streamp strm, int level, int method, int windowBits, int memLevel, int strategy, const char *version, int stream_size)"], [0xC223C, "void srand48(int)"], [0xC2240, "int lrand48(void)"], [0xC2244, "FILE *fdopen(int fd, const char *modes)"], [0xC2248, "char *strncat(char *, const char *, size_t)"], [0xC224C, "int strtol(const char *, char **, int)"], [0xC225C, "int pthread_setspecific(pthread_key_t key, const void *pointer)"], [0xC2260, "int pthread_once(pthread_once_t *once_control, void (*init_routine)(void))"], [0xC2264, "void *pthread_getspecific(pthread_key_t key)"], [0xC2268, "int pthread_key_create(pthread_key_t *key, void (*destr_function)(void *))"], [0xC226C, "int pthread_cond_wait(pthread_cond_t *cond, pthread_mutex_t *mutex)"], [0xC2270, "int pthread_cond_broadcast(pthread_cond_t *cond)"])
        for (var i = 0; i < pGot.length; i++) {
            var addr = pGot[i]
            var funcName = DebugSymbol.fromAddress(ptr(addr)).toString().split("!")[1]
           
            table.forEach(function (item: any) {
                if (item[1].toString().indexOf(funcName) != -1) {
                    pGot[i] = item[0].toInt32()
                    logd("replace " + funcName + " to " + ptr(item[0]))
                }
            })
            
        }

    }

}