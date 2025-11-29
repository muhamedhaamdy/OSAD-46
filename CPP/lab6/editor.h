#ifndef EDITOR
#define EDITOR

void editor();
void execute_command(char *command, char *buffer, int len, bool &should_quit);
void insert_mode(char *buffer, int &len, int *line_start);
void display_buffer(char *buffer, int len);
void execute_command(char *command, char *buffer, int len, bool &should_quit);
void comand_mode(char *buffer, int &len, bool &should_quit);

#endif