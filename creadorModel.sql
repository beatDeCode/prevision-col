set serveroutput on ;
declare
    v_table varchar(100);
    v_fillable varchar(1000);
    v_required varchar(1000);
    v_message varchar(1000);
begin
    v_table:=upper('tempcotizacion');
for reg in (
    select lower(column_name) column_name from all_tab_columns 
    where upper(owner)=upper('prevision')
    and table_name=(v_table)
)loop
    v_fillable:='"'||reg.column_name||'",'||v_fillable;
    v_required:='"'||reg.column_name||'"=>"required",'||v_required;
    v_message:='"'||reg.column_name||'.required"=>"El campo est� vac�o.",'||v_message;
end loop;
dbms_output.put_line('protected $table="'||v_table||'";');
dbms_output.put_line('public $timestamps=false;');
dbms_output.put_line('public $incrementing=false;');
dbms_output.put_line('public $fillable=['||substr(v_fillable,1,length(v_fillable)-1)||'];');
dbms_output.put_line('public function fnValidaciones(){ return ['||substr(v_required,1,length(v_required)-1)||'];}');
dbms_output.put_line('public function fnMensajes(){return ['||substr(v_message,1,length(v_message)-1)||'];}');
end;